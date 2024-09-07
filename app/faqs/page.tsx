import { FaqType } from "@/interface"

export default async function FaqPage() {
  const data: FaqType[] = await getData()

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-lg md:text-3xl font-semibold">FAQ</h1>
      <p className="mt-2 text-gray-600">도움말 내용을 확인해주세요.</p>
      <div className="mt-8 flex flex-col mb-10">
        {data?.map((faq) => (
          <div
            key={faq.id}
            className="py-5 border-b border-b-gray-200 text-black items-center font-semibold"
          >
            <div>{faq.title}</div>
            <div className="text-gray-600 font-normal mt-2">{faq.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

async function getData() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/faqs`, {
      cache: "force-cache",
    })

    if (!res.ok) {
      throw new Error("failed to fetch")
    }

    return res.json()
  } catch (e) {
    console.error(e)
  }
}
