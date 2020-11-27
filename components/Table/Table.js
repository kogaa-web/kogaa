import classes from "./Table.module.css";

const Table = ({ data }) => {
  const tableData = data
    .map((entry, index, array) => {
      return index % 2 === 1
        ? null
        : {
            value: array[index + 1],
            index: entry,
          };
    })
    .filter((entry) => {
      return entry != null;
    });
  console.log(tableData);
  return (
    <table className={classes.Table}>
      {tableData.map((element) => {
        return (
          <tr>
            <td>{element.index}</td>
            <td>{element.value}</td>
          </tr>
        );
      })}
    </table>
  );
};

export default Table;
