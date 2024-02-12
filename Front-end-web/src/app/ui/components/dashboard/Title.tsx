export function Title({ title }: Readonly<{ title: string }>): JSX.Element {
  return (
    <div className="text-3xl">
      <p>{title}</p>
    </div>
  );
}
