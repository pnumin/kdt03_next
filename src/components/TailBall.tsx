const BALLCOLOR  = [
  "bg-red-500",
  "bg-amber-500",
  "bg-yellow-500",
  "bg-green-500", 
  "bg-blue-500",
] as const ;

interface TailBallProps {
  n : number | undefined
}
export default function TailBall({n} : TailBallProps) {
  return (
    <div className={`w-20 h-20 rounded-full 
                    text-xl font-bold
                    text-white ${n && BALLCOLOR[Math.floor(n/10)]}
                    m-2
                    flex justify-center items-center`}>
      {n}
    </div>
  )
}
