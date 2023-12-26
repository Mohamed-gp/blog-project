import herobackground from "/assets/images/home-bg.jpg"


const Hero = () => {
    return (
        <div style={{backgroundImage: `url(${herobackground})`, backgroundRepeat : "no-repeat",backgroundPosition : "center", backgroundSize :"cover"}} className="flex items-center justify-center serbas h-52">
                <p className="px-6 py-3 text-3xl font-bold bg-white border-4 border-solid rounded-3xl border-green-color">
                        Welcome To BLOG
                </p>
        </div>
    )
}
export default Hero