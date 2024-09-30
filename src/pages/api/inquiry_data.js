import { db } from '@vercel/postgres';

export default async function handler(req, res) {
  const { id } = req.query;
  console.log('API 의 아이디', id);

  try {
    const rows = await db`
      SELECT 
            ci.*,
            summary.total, 
            summary.total_complete, 
            summary.mis_complete
        FROM 
            customer_inquiry ci
        JOIN 
            (
                SELECT 
                    id, 
                    COUNT(*) AS total, 
                    SUM(CASE WHEN complete = true THEN 1 ELSE 0 END) AS total_complete, 
                    COUNT(*) - SUM(CASE WHEN complete = true THEN 1 ELSE 0 END) AS mis_complete
                FROM 
                    customer_inquiry
                GROUP BY 
                    id
            ) AS summary
        ON 
            ci.id = summary.id
        WHERE 
            ci.id = ${id};
      `;

    let result = Object.values(JSON.parse(JSON.stringify(rows))); //  RowDataPacket 을 data (배열에 담긴 객체)로 최종 처리
    console.log('결과', result[2]);
    res.json(result[2]);
    return;
  } catch (err) {
    console.log(err);
  } finally {
  }
}
