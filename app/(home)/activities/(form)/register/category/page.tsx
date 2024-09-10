"use client"

import { useEffect, useState } from "react"
import NextButton from "@/components/Form/NextButton"
import Stepper from "@/components/Form/Stepper"
import { ACTIVITY_CATEGORY_DATA } from "@/constants"
import cn from "classnames"
import { useRecoilState } from "recoil"
import { activityFormState } from "@/atom"
import { useRouter } from "next/navigation"

export default function ActivityRegisterCategory() {
  const router = useRouter()
  const [activityForm, setActivityForm] = useRecoilState(activityFormState)
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [disableSubmit, setDisableSubmit] = useState<boolean>(false)

  const handleSubmit = () => {
    setActivityForm({
      ...activityForm,
      category: selectedCategory,
      images: activityForm?.images || [],
      title: activityForm?.title || "",
      desc: activityForm?.desc || "",
      price: activityForm?.price || 0,
      address: activityForm?.address || "",
      lat: activityForm?.lat || "",
      lng: activityForm?.lng || "",
    })

    router.push("/activities/register/info")
  }

  useEffect(() => {
    setSelectedCategory(activityForm?.category || "")
  }, [activityForm])

  return (
    <>
      <Stepper count={1} totalSteps={4} />
      <section className="mt-10 flex flex-col gap-4">
        <h1 className="font-semibold text-lg md:text-2xl text-center">
          다음 중 활동을 가장 잘 나타내는 것은 무엇인가요?
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10 px-10">
          {ACTIVITY_CATEGORY_DATA?.map((category) => (
            <button
              type="button"
              key={category.title}
              onClick={() => setSelectedCategory(category.title)}
              className={cn(
                "border-2 hover:bg-black/5 rounded-md px-6 py-4 flex flex-col gap-2",
                {
                  "border-2 border-black": selectedCategory === category.title,
                },
              )}
            >
              <div className="text-2xl">
                <category.Icon />
              </div>
              <h1 className="font-semibold text-lg">{category.title}</h1>
            </button>
          ))}
        </div>
      </section>
      <NextButton
        disabled={!selectedCategory || disableSubmit}
        onClick={handleSubmit}
      />
    </>
  )
}
