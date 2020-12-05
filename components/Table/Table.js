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
  return (
    <table className={classes.Table}>
      <tbody>
        {tableData.map((element) => {
          return (
            <tr key={element.index + element.value}>
              <td>{element.index}</td>
              <td>{element.value}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
