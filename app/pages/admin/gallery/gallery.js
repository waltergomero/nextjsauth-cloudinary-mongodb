import Link from "next/link";

const GalleryPage = (props) => {
  const users = props.data;
  const role = localStorage.getItem("role");
  return (
    <>
      <div className="flex h-full flex-col rounded p-4 m-2 border border-gray-200">
        <div>
          <Link
            href="/pages/admin/gallery/upload"
            className="px-4 py-1.5 bg-blue-600 text-white font-medium text-xs uppercase rounded"
          >
            Upload Images
          </Link>
        </div>

      </div>
    </>
  );
}

export default GalleryPage;