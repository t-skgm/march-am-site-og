import { EntrySkeletonType } from 'contentful'
import { createContentfulClient } from './client'
import { IArticle, IArticleFields } from './generated'

type IArticleSys = Pick<IArticle, 'sys'>

export const getArticle = async ({ articleId }: { articleId: string }) => {
  const entry = await createContentfulClient().getEntry(articleId)
  return entry as unknown as EntrySkeletonType<IArticleFields> & IArticleSys
}
