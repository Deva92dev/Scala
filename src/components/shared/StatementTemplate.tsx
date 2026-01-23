import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { format } from "date-fns";

const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: "Helvetica" },
  header: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: { fontSize: 24, fontWeight: "bold" },
  section: { margin: 10, padding: 10 },
  table: {
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
  },
  tableRow: { margin: "auto", flexDirection: "row" },
  tableColHeader: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    backgroundColor: "#f0f0f0",
    padding: 5,
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    padding: 5,
  },
  cellText: { margin: 5, fontSize: 10 },
});

// Define data shape
interface StatementData {
  orgName: string;
  date: Date;
  orders: {
    id: string;
    date: Date;
    total: string;
    status: string;
  }[];
}

export const StatementPDF = ({ data }: { data: StatementData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Monthly Statement</Text>
          <Text style={{ fontSize: 10, color: "gray" }}>{data.orgName}</Text>
        </View>
        <Text style={{ fontSize: 12 }}>{format(data.date, "MMMM yyyy")}</Text>
      </View>

      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableColHeader}>
            <Text style={styles.cellText}>Order ID</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.cellText}>Date</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.cellText}>Status</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.cellText}>Amount</Text>
          </View>
        </View>

        {data.orders.map((order) => (
          <View style={styles.tableRow} key={order.id}>
            <View style={styles.tableCol}>
              <Text style={styles.cellText}>#{order.id.slice(0, 8)}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.cellText}>
                {format(new Date(order.date), "MMM dd")}
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.cellText}>{order.status}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.cellText}>${order.total}</Text>
            </View>
          </View>
        ))}
      </View>

      <Text
        style={{
          marginTop: 20,
          fontSize: 10,
          textAlign: "center",
          color: "gray",
        }}
      >
        End of Statement
      </Text>
    </Page>
  </Document>
);
