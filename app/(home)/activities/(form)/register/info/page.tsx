"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useRecoilState } from "recoil"
import { useForm } from "react-hook-form"
import { activityFormState } from "@/atom"
import Stepper from "@/components/Form/Stepper"
import NextButton from "@/components/Form/NextButton"

interface ActivityInfoProps {
  title: string
  desc: string
  price: number
}

export default function ActivityRegisterInfo() {
  const router = useRouter()
  const [activityForm, setActivityForm] = useRecoilState(activityFormState)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ActivityInfoProps>()

  const onSubmit = (data: ActivityInfoProps) => {
    setActivityForm({
      ...activityForm,
      title: data.title || "",
      desc: data.desc || "",
      price: data.price || 0,
      address: activityForm?.address || "",
      images: activityForm?.images || [],
      category: activityForm?.category || "",
      lat: activityForm?.lat || "",
      lng: activityForm?.lng || "",
    })
    router.push("/activities/register/address")
  }

  useEffect(() => {
    if (activityForm) {
      setValue("title", activityForm.title || "")
      setValue("desc", activityForm.desc || "")
      setValue("price", activityForm.price || 0)
    }
  }, [activityForm, setValue])

  return (
    <>
      <Stepper count={2} totalSteps={4} />
      <form
        className="mt-10 flex flex-col gap-6 px-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="font-semibold text-lg md:text-2xl text-center">
          활동의 기본 정보를 입력해주세요
        </h1>
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-lg font-semibold">
            활동 이름
          </label>
          <input
            {...register("title", { required: true, maxLength: 30 })}
            className="outline-none px-4 py-2 rounded-lg border-2 focus:border-black"
          />
          {errors.title && errors.title.type === "required" && (
            <span className="text-red-600 text-sm">필수 항목입니다.</span>
          )}
          {errors.title && errors.title.type === "maxLength" && (
            <span className="text-red-600 text-sm">
              설명은 30자 이내로 작성해주세요.
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="desc" className="text-lg font-semibold">
            활동 설명
          </label>
          <textarea
            rows={3}
            {...register("desc", { required: true })}
            className="outline-none px-4 py-2 rounded-lg border-2 focus:border-black resize-none"
          />
          {errors.desc && errors.desc.type === "required" && (
            <span className="text-red-600 text-sm">필수 항목입니다.</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="price" className="text-lg font-semibold">
            활동 가격
          </label>
          <input
            type="number"
            {...register("price", { required: true })}
            className="outline-none px-4 py-2 rounded-lg border-2 focus:border-black"
          />
          {errors.price && errors.price.type === "required" && (
            <span className="text-red-600 text-sm">필수 항목입니다.</span>
          )}
        </div>
        <NextButton type="submit" disabled={isSubmitting} />
      </form>
    </>
  )
}
