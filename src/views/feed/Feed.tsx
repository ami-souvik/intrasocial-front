import { useState, useEffect } from 'react'
import { gql, useQuery } from '@apollo/client'
import { ContentType } from '@/views/content/Content'
import ContentCard from '../content/ContentCard'
import Loader from '@/components/Loader'
import schema from '@/queries/schema'

const CONTENTS_QUERY = gql`
  query getContents($last: Int!, $offset: Int!) {
    contents(last: $last, offset: $offset) {
      id
      title
      body
      feedback {
        id
        vote
      }
      owner {
        id
        username
        firstName
        lastName
        email
        emojiUnicode
      }
      upvoteCount
      downvoteCount
      createdAt
      commentCount
    }
  }
`

export function Feed() {
  const {
    data: _d,
    error,
    refetch
  } = useQuery(CONTENTS_QUERY, {
    variables: {
      last: schema.content.records,
      offset: 0
    }
  })
  const [data, setData] = useState({
    contents: [],
    offset: 0,
    eoc: false
  })
  async function handleScroll(e) {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight
    if (bottom && !data.eoc) {
      await refetch({
        last: schema.content.records,
        offset: data.offset
      })
    }
  }
  useEffect(() => {
    const app = window.document.getElementById('app')
    app?.addEventListener('scroll', handleScroll)
    return () => {
      app?.removeEventListener('scroll', handleScroll)
    }
  }, [data])
  useEffect(() => {
    if (_d?.contents) {
      setData((v) => {
        const c = JSON.parse(JSON.stringify(v.contents))
        c.push(..._d.contents)
        return {
          contents: c,
          offset: v.offset + schema.content.records,
          eoc: _d?.contents.length < schema.content.records
        }
      })
    }
  }, [_d])
  if (error) return <pre>{error.message}</pre>
  return (
    <div className="my-2 space-y-1">
      {data.contents.map((each: ContentType, idx: number) => (
        <ContentCard key={idx} data={each} />
      ))}
      {!data.eoc && (
        <div className="flex h-10 justify-center items-center">
          <Loader size="lg" />
        </div>
      )}
    </div>
  )
}
