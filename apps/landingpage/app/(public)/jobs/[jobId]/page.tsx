export default function JobDetailPage({ params }: { params: { jobId: string } }) {
  return <main className="mx-auto max-w-[960px] px-4 py-10 md:px-8"><h1 className="text-3xl font-bold">Job {params.jobId}</h1></main>;
}
