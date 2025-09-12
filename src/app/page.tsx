export default function HomePage() {
  throw new Error("Test error!"); // <-- this will trigger your error.tsx
  return <div>Homepage content</div>;
}
