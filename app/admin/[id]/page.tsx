import { getToken } from "../../../utils/encrypt";

export async function getProps({ params }) {
  const token = getToken({ id: params.id });
  return {
    id: params.id,
    token,
  };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    { params: { id: "a" } },
    { params: { id: "b" } },
    { params: { id: "c" } },
  ];
}

export default async function Page({ params }) {
  const { id, token } = await getProps({ params });

  return (
    <div>
      <h1>Encrypted Open Graph Image.</h1>
      <a
        href={`/encrypted?id=${id}&token=${token}`}
        target="_blank"
        rel="noreferrer"
      >
        <code>
          /api/encrypted?id={id}&token={token}
        </code>
      </a>
    </div>
  );
}
