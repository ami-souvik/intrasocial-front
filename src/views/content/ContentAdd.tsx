import ContentForm from '@/forms/ContentForm'

export default function ContentAdd() {
  return (
    <div className="my-4">
      <ContentForm
        onSuccess={(data) => {
          window.open(`/content/${data.id}`, '_self')
        }}
      />
    </div>
  )
}
