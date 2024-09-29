const About = () => {
  return (
    <>
      <div className="flex flex-col pt-10 items-end h-screen" style={{ backgroundImage: "url('/assets/img.jpg')", backgroundPosition: 'center', backgroundSize: 'cover' }}>
			<div className="flex flex-row">
        <h1 className="text-4xl font-bold mr-[11px]">About </h1><h1 className="text-4xl font-bold mr-12 text-red-600">Us</h1>
			</div>
        <p className="w-[60%] text-xl mt-4 mr-8 font-medium text-pretty text-right">
          CollaborAid was built with upmost care to provide you with the most
          seamless experience in finding your next collaboration. We believe
          that great things are born when people come together and our service
          is here to help you make that happen. CollaborAid team consists of
          passionate students who are dedicated to providing you with the best
          experience possible. We hope you enjoy your time here!
        </p>
      </div>
    </>
  );
};

export default About;
