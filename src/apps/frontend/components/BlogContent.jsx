const BlogContent = function ({ image, title, updatedBy }) {
  return (
    <>
      <a href="#">
        <figure className="blog-img rounded-md overflow-hidden relative pt-[70%]">
          <img
            src={image}
            alt=""
            className="absolute top-1/2 left-1/2 translate-[-50%]"
          />
        </figure>
        <div className="blog-cntnt rounded bg-white absolute bottom-0 left-[50%] translate-x-[-50%] translate-y-[50%] w-90 p-4 text-center">
          <h3 className="text-xl font-bold mb-3">{title}</h3>
          <span>{updatedBy}</span>
        </div>
      </a>
    </>
  );
};

export default BlogContent;
