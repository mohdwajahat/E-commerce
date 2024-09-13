import img1 from "../assets/hero1.webp";
import img2 from "../assets/hero2.webp";
import img3 from "../assets/hero3.webp";
import img4 from "../assets/hero4.webp";
import { Link } from "react-router-dom";

const Hero = () => {
	const carouselImages = [img1, img2, img3, img4];
	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
			<div>
				<h1 className="max-w-2xl text-4xl font-bold tracking-tight  sm:text-6xl ">
					We&apos;re changing the way people shop.
				</h1>

				<p className="mt-8 max-w-xl text-lg leading-8">
					Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure
					qui lorem cupidatat commodo. Elit sunt amet fugiat veniam
					occaecat fugiat aliqua. Anim aute id magna aliqua ad ad non
					deserunt sunt. Qui irure qui lorem cupidatat commodo.
				</p>
				<div className="mt-10 ">
					<Link to="products" className="btn btn-primary ">
						Our Products
					</Link>
				</div>
			</div>
			<div className="hidden lg:carousel carousel-center bg-neutral h-[28rem] rounded-box  space-x-4 p-4">
				{carouselImages.map((img,index) => {
					return (
						<div className="carousel-item" key={index}>
							<img
								src={img}
								className="rounded-box h-full w-80 object-cover"
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Hero;
