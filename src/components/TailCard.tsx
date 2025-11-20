interface TailCardProps {
  imgurl : string, 
  title : string, 
  subtitle : string, 
  tag :string 
}
export default function TailCard({ imgurl, title, subtitle, tag } : TailCardProps ) {
  let tags : React.ReactElement | React.ReactElement[];
  if ( tag.includes(',') ) {
    let tm  = tag.split(',') 
    tags = tm.map(kw => <span key={kw} 
                          className="bg-amber-50 rounded-sm p-2 inline-flex m-1 text-sm">
                              {kw}
                          </span>) ;
    if (tags.length >= 4 ) tags = tags.slice(0, 5) ;
  }
  else {
    tags = <span className="bg-amber-50 rounded-sm p-2 flex m-1 text-sm h-14" >
                {tag}</span>
    } ;

  // console.log(tags)
  return (
    <div className="max-w-sm h-96 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div>
        <img className="rounded-t-lg w-full h-46 object-cover"
          src={imgurl} alt="" />
      </div>
      <div className="p-2 h-50 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {title}
          </h1>
          <p className="mb-2 tracking-tight text-gray-800 text-sm">
            {subtitle}
          </p>
        </div>
        <p className="mb-1 font-normal text-gray-700">
          {tags}
        </p>
      </div>
    </div>

  )
}
