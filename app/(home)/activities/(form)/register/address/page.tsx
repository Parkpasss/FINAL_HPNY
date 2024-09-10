"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { useRecoilState } from "recoil"
import { activityFormState } from "@/atom"
import Stepper from "@/components/Form/Stepper"
import NextButton from "@/components/Form/NextButton"
import AddressSearch from "@/components/Form/AddressSearch"

interface ActivityAddressProps {
  address?: string
}

export default function ActivityRegisterAddress() {
  const router = useRouter()
  const [activityForm, setActivityForm] = useRecoilState(activityFormState)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ActivityAddressProps>()

  const onSubmit = (data: ActivityAddressProps) => {
    setActivityForm({
      ...activityForm,
      address: data?.address || "", // 기본값 설정
      images: activityForm?.images || [], // 기본값 설정
      title: activityForm?.title || "", // 기본값 설정
      desc: activityForm?.desc || "", // 기본값 설정
      price: activityForm?.price || 0, // 기본값 설정
      category: activityForm?.category || "", // 기본값 설정
      lat: activityForm?.lat || "", // 기본값 설정
      lng: activityForm?.lng || "", // 기본값 설정
    })

    router.push("/activities/register/image")
  }

  useEffect(() => {
    if (activityForm) {
      setValue("address", activityForm?.address || "")
    }
  }, [activityForm, setValue])

  return (
    <>
      <Stepper count={4} totalSteps={4} />
      <form
        className="mt-10 flex flex-col gap-6 px-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="font-semibold text-lg md:text-2xl text-center">
          활동의 위치를 입력해주세요
        </h1>
        <AddressSearch
          register={register}
          errors={errors}
          setValue={setValue}
        />
        <NextButton type="submit" />
      </form>
    </>
  )
}
