/* eslint-disable @next/next/no-img-element */
"use client"

import { activityFormState } from "@/atom"
import { useRouter } from "next/navigation"
import { useRecoilState, useResetRecoilState } from "recoil"
import { useForm } from "react-hook-form"
import Stepper from "@/components/Form/Stepper"
import NextButton from "@/components/Form/NextButton"
import { AiFillCamera } from "react-icons/ai"
import toast from "react-hot-toast"
import axios from "axios"
import { useState } from "react"
import { useSession } from "next-auth/react"
import Image from "next/image"

interface ActivityImageProps {
  images?: string[]
}

export default function ActivityRegisterImage() {
  const router = useRouter()
  const { data: session } = useSession()
  const [activityForm, setActivityForm] = useRecoilState(activityFormState)
  const [images, setImages] = useState<string[] | null>(null)
  const [disableSubmit, setDisableSubmit] = useState<boolean>(false)
  const resetActivityForm = useResetRecoilState(activityFormState)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ActivityImageProps>()

  // 최대 5장 이미지 업로드 제한
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target

    if (!files) return
    if (files.length + (images?.length || 0) > 5) {
      toast.error("최대 5장의 사진만 업로드할 수 있습니다.")
      return
    }

    const newImages: string[] = []
    Array.from(files).forEach((file: File) => {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)

      fileReader.onloadend = (event: ProgressEvent<FileReader>) => {
        const { result } = event.target as FileReader
        if (result) {
          newImages.push(result.toString())
        }
      }
    })

    setImages((prevImages) =>
      prevImages ? [...prevImages, ...newImages] : newImages,
    )
  }

  async function uploadImages(images: string[] | null) {
    const uploadedImageUrls = []

    if (!images) return

    for (const imageFile of images) {
      const formData = new FormData()

      if (imageFile) {
        formData.append("file", imageFile)

        if (process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET) {
          formData.append(
            "upload_preset",
            process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
          )
        }

        try {
          const res = await axios.post(
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
            formData,
          )
          uploadedImageUrls.push(res.data.secure_url) // 업로드한 이미지 URL 저장
        } catch (error) {
          console.error("Error uploading images: ", error)
        }
      }
    }

    return uploadedImageUrls
  }

  const onSubmit = async () => {
    try {
      setDisableSubmit(true)
      const imageUrls = await uploadImages(images)
      const result = await axios.post("/api/activities", {
        ...activityForm,
        images: imageUrls,
      })

      if (result.status === 200) {
        toast.success("활동을 등록했습니다.")
        resetActivityForm()
        router.push("/")
      } else {
        toast.error("데이터 생성 중 문제가 발생했습니다.")
      }
    } catch (error) {
      console.error("Error submitting form: ", error)
      toast.error("이미지 저장 중 문제가 발생했습니다. 다시 시도해주세요")
    } finally {
      setDisableSubmit(false)
    }
  }

  return (
    <>
      <Stepper count={5} totalSteps={5} />
      <form
        className="mt-10 flex flex-col gap-6 px-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="font-semibold text-lg md:text-2xl text-center">
          활동의 사진을 추가해주세요
        </h1>
        <p className="text-sm md:text-base text-gray-500 text-center">
          활동 사진은 최대 5장까지 추가할 수 있습니다.
        </p>
        <div className="flex flex-col gap-2">
          <div className="col-span-full">
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                <AiFillCamera className="mx-auto h-12 w-12 text-gray-300" />
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-lime-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-lime-600 focus-within:ring-offset-2 hover:text-lime-500"
                  >
                    <span>최대 5장의 사진을</span>
                    <input
                      id="file-upload"
                      type="file"
                      multiple
                      accept="image/*"
                      className="sr-only"
                      {...register("images", { required: true })}
                      onChange={handleFileUpload}
                    />
                  </label>
                  <p className="pl-1">업로드 해주세요</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">
                  PNG, JPG, GIF 등 이미지 포맷만 가능
                </p>
              </div>
            </div>
          </div>
          {errors?.images && errors?.images?.type === "required" && (
            <span className="text-red-600 text-sm">필수 항목입니다.</span>
          )}
        </div>
        <div className="mt-10 max-w-lg mx-auto flex flex-wrap gap-4">
          {images &&
            images?.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt="미리보기"
                width={100}
                height={100}
                className="rounded-md"
              />
            ))}
        </div>
        <NextButton
          type="submit"
          text="완료"
          disabled={isSubmitting || disableSubmit}
        />
      </form>
    </>
  )
}
