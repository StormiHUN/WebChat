import { Link } from "react-router-dom"
import { useAuth } from "../components/AuthProvider"

export default function Home() {

    const auth = useAuth()

    return (
        <div className="flex min-h-screen">
            <nav className="w-96 border-r-2 border-blue-500 h-screen flex flex-col justify-between sticky top-0">
                <div className="p-2">
                    <Link className="flex p-2 gap-2 items-center rounded border border-transparent hover:bg-blue-50 hover:border-blue-500 transition-all">
                        <img className="w-16 h-16 rounded-full border p-1 border-blue-500" src="https://cdn.usdairy.com/optimize/getmedia/b5108b6f-59c3-4cc4-b1d5-4b9b0d1e0c54/swiss.jpg.jpg.aspx?format=webp" />
                        <p className="text-xl">Sajt</p>
                    </Link>
                </div>
                <Link className="sticky bottom-0 flex items-center p-4 gap-2 border-t-2 border-blue-500 hover:bg-blue-50 transition-all" to="/settings">
                    <img className="w-12 h-12 rounded-full border p-1 border-blue-500" src={auth.user.ProfilePic} />
                    <p className="text-xl">{auth.user.DisplayName}</p>
                    <img className="ml-auto" src="/settings.svg" />
                </Link>
            </nav>
            <div className="flex flex-col flex-1">
                <div className="p-4">

                    <div className="flex p-2 gap-2 w-2/3">
                        <img className="w-12 h-12 rounded-full border border-blue-500" src="https://cdn.usdairy.com/optimize/getmedia/b5108b6f-59c3-4cc4-b1d5-4b9b0d1e0c54/swiss.jpg.jpg.aspx?format=webp" />
                        <div className="flex flex-col">
                            <p className="text-sm font-bold">Sajt</p>
                            <p className="bg-blue-200 p-2 rounded-lg mt-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio officiis voluptatum vitae rem corporis temporibus a enim vero consequatur, ut sit nemo, libero atque consequuntur illo dolores sapiente quas quos eligendi quidem sequi, cupiditate accusantium sunt repellendus? Labore a quaerat sequi impedit fugiat soluta asperiores, nisi cum, aspernatur, optio voluptatibus veniam est esse suscipit alias. Iusto, id nesciunt. Facilis eius illum distinctio ratione cum qui, ex at mollitia cumque quos reprehenderit soluta. Vitae, esse minima dolorem adipisci consequatur eligendi nesciunt itaque autem repellendus voluptas cumque voluptatum, ipsa ab reiciendis beatae, dolor sed facere dolores ex ea quasi! Blanditiis, voluptatibus laborum iusto mollitia reprehenderit ut nobis dolores dolore, iste dolorum veniam corporis modi quasi debitis fuga? Ut at distinctio dolorum corporis delectus voluptates illo impedit! Eaque eveniet aperiam aliquam repudiandae perferendis soluta earum repellat consectetur nesciunt rerum sequi animi, cupiditate maxime et. Consectetur quae sunt omnis harum deserunt dignissimos esse ab, doloribus suscipit veniam eaque, laudantium iure repellendus atque, blanditiis error sit nostrum nisi numquam? Iusto neque iste, quas distinctio optio voluptate aperiam error id cum itaque saepe deserunt nemo alias dolores exercitationem, excepturi recusandae nihil voluptas explicabo. Illum, ab adipisci. Ullam corrupti amet quos quibusdam nisi quasi nobis natus nemo.</p>
                            <p className="text-sm">22:02</p>
                        </div>
                    </div>

                    <div className="flex p-2 gap-2 ml-auto w-2/3">
                        <div className="flex flex-col">
                            <p className="text-sm font-bold ml-auto">Sajt</p>
                            <p className="bg-blue-200 p-2 rounded-lg mt-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam cumque repudiandae vero sint dolores ab molestias explicabo consectetur veniam odit possimus totam sit autem harum adipisci asperiores mollitia eaque, temporibus id pariatur ipsum laboriosam assumenda blanditiis? Cum totam laboriosam ad optio autem fuga aliquid expedita nesciunt dicta a maxime aliquam vero, omnis suscipit quo officia dolorum animi consequatur error non dolore vel! Nihil, facilis omnis adipisci nesciunt alias tempora laudantium tempore esse rem perferendis cumque eligendi illum sequi iusto ad id, natus nam veniam sint soluta? Exercitationem voluptates eum optio ea earum quam inventore, saepe obcaecati maxime laudantium odit ratione, fuga voluptate temporibus iste! Dignissimos repellat id aperiam non saepe quo aliquam ipsum laboriosam consequatur vitae illo architecto, consequuntur ipsam. Accusamus, non harum asperiores eum ut doloremque, consectetur omnis debitis fugiat consequuntur ex iusto suscipit assumenda dicta hic eaque? Illo natus, odio dolore, est corporis praesentium nisi labore repudiandae libero fugiat optio alias nam provident velit, quaerat ratione accusamus temporibus tenetur numquam repellat repellendus quos porro sit sequi? Itaque debitis maiores qui dolorum porro deserunt necessitatibus eum adipisci esse molestiae magnam consequuntur tempore corporis iure molestias praesentium totam corrupti ratione, doloribus cumque. Excepturi obcaecati explicabo iusto rerum! Hic, modi ea.</p>
                            <p className="text-sm ml-auto">22:02</p>
                        </div>
                        <img className="w-12 h-12 rounded-full border border-blue-500" src="https://cdn.usdairy.com/optimize/getmedia/b5108b6f-59c3-4cc4-b1d5-4b9b0d1e0c54/swiss.jpg.jpg.aspx?format=webp" />
                    </div>

                </div>
                <div className="mt-auto w-full p-4 flex gap-2">
                    <input className="bg-gray-50 border border-blue-300 rounded-full p-2 w-full hover:border-blue-500 transition-all" placeholder="Message" type="text" />
                    <button className="bg-blue-300 hover:bg-blue-500 rounded-full transition-all p-4"><img src="send.svg" /></button>
                </div>
            </div>
        </div>
    )
}