const SummaryCard = ({ title, value, isMoney, extra }) => {
  return (
    <div className="stats ">
      <h4>{title}</h4>
      {isMoney && <h3>${value}</h3>}
      {!isMoney && <h3>{value}</h3>}
      {extra && <h4>Rating: {extra}</h4>}
    </div>
  );
};

export default SummaryCard;
