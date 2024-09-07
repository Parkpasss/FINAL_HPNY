async function getData() {
  const res = await fetch(
    "https://www.random.org/integers/?num=1&min=1&max=100&col=1&base=10&format=plain",
    {
      cache: "no-store",
    },
  )
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data")
  }

  return res.json()
}

export default async function Page() {
  const data = await getData()

  return (
    <main className="text-center min-h-screen py-40">
      <h1 className="font-bold text-xl">SSR</h1>
      <h2>number: {data}</h2>
    </main>
  )
}
