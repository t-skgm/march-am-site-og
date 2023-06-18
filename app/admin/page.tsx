import { PageProps } from "../../types";
import { getToken } from "../../utils/encrypt";

async function getKeyToken(params: Record<string, unknown>) {
  return getToken(params);
}

export const dynamicParams = true;

export default async function Page({
  searchParams,
}: PageProps<{}, { id: string }>) {
  const token = await getKeyToken(searchParams);
  const id = searchParams.id;

  return (
    <div>
      <h1>Encrypted Open Graph Image.</h1>
      <p>params: {JSON.stringify(searchParams)}</p>
      <a href={`/og?id=${id}&token=${token}`} target="_blank" rel="noreferrer">
        <code>
          /og?id={id}&token={token}
        </code>
      </a>
    </div>
  );
}
