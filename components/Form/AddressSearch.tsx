"use client"

import {
  FieldValues,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  Path,
} from "react-hook-form"
import DaumPostcodeEmbed from "react-daum-postcode"
import { useState } from "react"

interface AddressProps<T extends FieldValues> {
  setValue: UseFormSetValue<T>
  register: UseFormRegister<T>
  errors: FieldErrors<T>
  label?: string
}

export default function AddressSearch<T extends FieldValues>({
  register,
  errors,
  setValue,
  label = "주소",
}: AddressProps<T>) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleComplete = (data: any) => {
    let fullAddress = data.address
    let extraAddress = ""

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : ""
    }

    setValue("address" as Path<T>, fullAddress)
    setIsOpen(false)
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        <label htmlFor="address" className="text-lg font-semibold">
          {label}
        </label>
        <div className="grid md:grid-cols-4 gap-6">
          <input
            readOnly
            placeholder={`${label}를 입력해주세요`}
            {...register("address" as Path<T>, { required: true })}
            className="col-span-3 block w-full outline-none px-4 py-2 rounded-lg border-2 focus:border-black placeholder:text-gray-400"
          />
          <button
            type="button"
            onClick={() => setIsOpen((val) => !val)}
            className="bg-lime-600 hover:bg-lime-500 py-1.5 px-2 rounded text-white"
          >
            주소 검색
          </button>
        </div>
        {}
        {errors.address && (
          <span className="text-red-600 text-sm">필수 항목입니다.</span>
        )}
      </div>
      {isOpen && (
        <div className="mt-4 border border-gray-300 w-full rounded-md p-2 max-w-lg mx-auto">
          <DaumPostcodeEmbed onComplete={handleComplete} />
        </div>
      )}
    </>
  )
}
