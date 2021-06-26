import Tabs from "./Tabs";
import Specification from "./Specification";
import Description from "./Description";
import Comment from "./Comment";

const BottomSection = ({ specifications, description, loading, width }) => {
  return (
    <>
      <Tabs loading={loading} />
      <div className="tab-content" id="pills-tabContent">
        <Specification specifications={specifications} loading={loading} />
        <Description description={description} loading={loading} />
        <Comment />
      </div>
    </>
  );
};

export default BottomSection;
