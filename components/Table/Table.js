import classes from "./Table.module.css";

const Table = ({ data }) => {
  const tableData = data
    .map((entry, index, array) => {
      return index % 2 === 1
        ? null
        : {
            value: array[index + 1].replace("&amp;", "&"),
            index: entry.replace("&amp;", "&"),
          };
    })
    .filter((entry) => {
      return entry != null;
    });
  return (
    <table className={classes.Table}>
      <tbody>
        {tableData.map((element, index) => {
          return (
            <tr key={element.index + element.value + index}>
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
