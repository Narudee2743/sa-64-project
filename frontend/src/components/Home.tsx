import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: { marginTop: theme.spacing(2), },
    table: { minWidth: 650, },
    tableSpace: { marginTop: 20, },
  })
);

function Home() {
  const classes = useStyles();

  return (
    <div>
      <Container className={classes.container} maxWidth="md">
        <h1 style={{ textAlign: "center" }}>ระบบขอคืนสินค้า</h1>
        <h3>Requirements</h3>
        <p>ระบบ Farm Mart เป็นระบบขายสินค้าผลผลิตทางการเกษตรบนระบบออนไลน์
          โดยจะต้องเป็นสมาชิก Farm Mart ก่อนจึงจะสามารถสั่งซื้อได้
          เมื่อมีการสั่งซื้อสินค้าผู้ใช้ระบบซึ่งเป็นสมาชิกจะไม่ทราบเลยว่าสินค้าที่จัดส่งมาจะได้รับความเสียหายหรือไม่
          ซึ่งระบบ Farm Mart สามารถขอคืนสินค้าได้เมื่อได้รับสินค้าที่มีปัญหาหรือได้รับไม่ครบถ้วน
          สมาชิกสามารถบันทึกข้อมูลการคืนสินค้าได้โดยสมาชิก login เข้าสู่ระบบ เพื่อขอคืนสินค้าและเลือกออเดอร์ที่ต้องการคืน
          ดังนั้นการขอคืนสินค้าของระบบ Farm Mart จะช่วยให้การคืนสินค้าง่ายขึ้น
          สะดวกต่อการดำเนินการและนอกจากนี้สมาชิกยังสามารถดูสินค้าที่เคยคืนได้อีกด้วย
        </p>
      </Container>
    </div>
  );
}
export default Home;