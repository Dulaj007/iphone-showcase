export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-gray-400 py-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p>&copy; {new Date().getFullYear()} iPhone 17 Showcase. All rights reserved.</p>
        <p className="mt-2 text-sm">
          Designed with ❤️ using Next.js and Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
