import {
  MdAddHomeWork,
  MdApartment,
  MdOutlineBedroomChild,
  MdOutlineSelfImprovement,
  MdOutlineSurfing,
} from "react-icons/md"
import { GiHouse } from "react-icons/gi"
import { FaHotel, FaHouseUser } from "react-icons/fa6"
import { RiHotelFill } from "react-icons/ri"

export const CATEGORY = [
  "호텔",
  "모텔",
  "게스트하우스",
  "아파트",
  "주택",
  "기타",
]

export const CATEGORY_DATA = [
  { title: "호텔", Icon: FaHotel },
  { title: "모텔", Icon: RiHotelFill },
  { title: "게스트하우스", Icon: FaHouseUser },
  { title: "아파트", Icon: MdApartment },
  { title: "주택", Icon: GiHouse },
  { title: "기타", Icon: MdAddHomeWork },
]

/**  @example - https://png-pixel.com/ */
export const BLUR_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOcNX9WPQAGAgJUl8IWQgAAAABJRU5ErkJggg=="

export const DEFAULT_LAT = "37.565337"
export const DEFAULT_LNG = "126.9772095"
export const ZOOM_LEVEL = 7

const FEATURE_TYPE = {
  FREE_CANCEL: "FREE_CANCEL",
  PAID_CANCEL: "PAID_CANCEL",
  SELF_CHECKIN: "SELF_CHECKIN",
  SELF_CHECKIN_DISALLOWED: "SELF_CHECKIN_DISALLOWED",
  FREE_OFFICE_SPACE: "FREE_OFFICE_SPACE",
  NO_OFFICE_SPACE: "NO_OFFICE_SPACE",
}

type FEATURE_TYPE = (typeof FEATURE_TYPE)[keyof typeof FEATURE_TYPE]

export const FeatureDesc: Record<FEATURE_TYPE, String> = {
  [FEATURE_TYPE.FREE_CANCEL]: "무료 취소 가능합니다.",
  [FEATURE_TYPE.PAID_CANCEL]: "무료 취소가 불가능합니다.",
  [FEATURE_TYPE.SELF_CHECKIN]: "셀프 체크인이 가능합니다.",
  [FEATURE_TYPE.SELF_CHECKIN_DISALLOWED]: "셀프 체크인이 불가능합니다.",
  [FEATURE_TYPE.FREE_OFFICE_SPACE]: "사무 시설이 있습니다.",
  [FEATURE_TYPE.NO_OFFICE_SPACE]: "사무 시설이 없습니다.",
}

export const RoomEditField = [
  "title",
  "category",
  "desc",
  "bedroomDesc",
  "price",
  "address",
  "images",
  "imageKeys",
  "freeCancel",
  "selfCheckIn",
  "officeSpace",
  "hasMountainView",
  "hasShampoo",
  "hasFreeLaundry",
  "hasAirConditioner",
  "hasWifi",
  "hasBarbeque",
  "hasFreeParking",
]

export interface RoomFeatureProps {
  freeCancel?: boolean
  selfCheckIn?: boolean
  officeSpace?: boolean
  hasMountainView?: boolean
  hasShampoo?: boolean
  hasFreeLaundry?: boolean
  hasAirConditioner?: boolean
  hasWifi?: boolean
  hasBarbeque?: boolean
  hasFreeParking?: boolean
}

interface FieldProps {
  field: keyof RoomFeatureProps
  label: string
}

export const FeatureFormField: FieldProps[] = [
  { field: "freeCancel", label: "무료 취소" },
  { field: "selfCheckIn", label: "셀프 체크인" },
  { field: "officeSpace", label: "사무시설" },
  { field: "hasMountainView", label: "마운틴 뷰" },
  { field: "hasShampoo", label: "욕실 용품" },
  { field: "hasFreeLaundry", label: "무료 세탁" },
  { field: "hasAirConditioner", label: "에어컨" },
  { field: "hasWifi", label: "무료 와이파이" },
  { field: "hasBarbeque", label: "바베큐 시설" },
  { field: "hasFreeParking", label: "무료 주차" },
]

import { MdOutlineMiscellaneousServices } from "react-icons/md"
import { AiOutlineShoppingCart } from "react-icons/ai"
import { IoTicketOutline } from "react-icons/io5"

export const ACTIVITY_CATEGORY_DATA = [
  { title: "티켓", Icon: IoTicketOutline },
  { title: "체험", Icon: MdOutlineSelfImprovement },
  { title: "상품", Icon: AiOutlineShoppingCart },
  { title: "기타", Icon: MdOutlineMiscellaneousServices },
]

export const ActivityEditField = [
  "title",
  "category",
  "desc",
  "price",
  "address",
  "images",
  "imageKeys",
]
