import Comment from "@/components/Comment";
import FeatureSection from "@/components/RoomDetail/FeatureSection";
import HeaderSection from "@/components/RoomDetail/HeaderSection";
import MapSection from "@/components/RoomDetail/MapSection";
import { ParamsProps, RoomType } from "@/interface";

export default async function RoomPage({ params }: ParamsProps ) {
  const { id } = params
  const data: RoomType = await getData(id)
  return ( 
  <div className="mt8 mb-20 max-w-6xl mx-auto">
  <HeaderSection data={data}/>
  <FeatureSection data={data}/>
  <Comment room={data}/>
  <MapSection data={data}/>
  </div>
)
}

async function getData(id:string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/rooms?id=${id}`,
      {
        next: {
          revalidate: 60 * 60,
        },
      },
    )

    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }

    return res.json()
  } catch (e) {
    console.error(e)
  }
}