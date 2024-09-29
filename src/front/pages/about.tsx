const About = () => {
  return (
    <>
      <div className="flex flex-col items-center pt-24 h-screen">
        <div className={"w-full h-[50vh]"}>
          <img
            src={"./public/assets/img.jpg"}
            className={"w-full h-full object-center object-cover"}
          />
        </div>
        <h1 className="text-4xl font-bold mt-10">About Us</h1>
        <p className="w-[70%] mb-[30%] text-xl mt-4 text-pretty text-center">
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
