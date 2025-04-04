import { useRouter } from "next/router";

export const Breadcrumb = () => {
  const routeLabelMap: Record<string, string> = {
    administrator: "admin top",
    articles: "article management",
    createPost: "create post",
    "[pageId]": "detail",
    edit: "edit",
    images: "image management",
    upload: "upload"
  };

  const router = useRouter();

  // パス分割（クエリパラメータ除去）
  const pathSegments = router.pathname.split("/").filter(Boolean);
  const asPathSegments = router.asPath.split("?")[0].split("/").filter(Boolean);

  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = `/${asPathSegments.slice(0, index + 1).join("/")}`;
    const isCurrent = index === pathSegments.length - 1;

    return {
      href,
      label: routeLabelMap[segment] || segment,
      isCurrent
    };
  });

  return (
    <div className="container px-4 py-1">
      <nav aria-label="breadcrumb" className="mb-1">
        <ol className="flex flex-wrap gap-2 text-sm text-black">
          {breadcrumbs.map((crumb, index) => (
            <li key={index} className="flex items-center gap-2">
              {index > 0 && <span>/</span>}
              {crumb.isCurrent ? (
                <span className="text-black cursor-default" aria-current="page">
                  {crumb.label}
                </span>
              ) : (
                <a
                  href={crumb.href}
                  className="hover:text-blue-500 transition-colors underline"
                >
                  {crumb.label}
                </a>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

Breadcrumb.displayName = "Breadcrumb";
