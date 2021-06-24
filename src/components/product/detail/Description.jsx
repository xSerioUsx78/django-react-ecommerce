const Description = ({ description }) => {
  return (
    <div
      className="tab-pane fade"
      id="pills-profile"
      role="tabpanel"
      aria-labelledby="pills-profile-tab"
    >
      {description}
    </div>
  );
};

export default Description;
