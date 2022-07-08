const pool = require('../config/db')

const doSearchSSPD = async (req, res) => {
    let query = {
        text:"SELECT no_sspd, nik, nama_wp, alamat_wp, nop, luas_tanah, luas_bangunan, nomor_sertifikat,bphtb_terhutang, jumlah_setoran  FROM sspd where no_sspd = $1 AND status_verifikasi = $2 AND jumlah_setoran > $3",
        value:[req.body.sspd, 1, 0]
        
    }
    pool.query(query.text,query.value, (err, result) => {
        if (err) {
            console.log(err)
            res.status(400).json({
                success: false,
                message: "Bad Request"
            })
          } else {
            if(result.rows[0]){
                res.status(200).json({
                    success: true,
                    data:result.rows[0]
                })
            }else{
                res.status(200).json({
                    success: false,
                    message: "Data not found"
                })
            }
          }
    })
}

const doInsertVaToSspd = async (va, sspd) => {
    let query = {
        text:`UPDATE sspd set virtual_account = $1, status_bayar = $2 WHERE no_sspd = $3 AND status_verifikasi = $4`,
        value:[va, 10, sspd, 1]
    }

    pool.query(query.text,query.value, (err, result) => {
        if(err){
            console.log("error insert va to sspd ")
        }else{
            console.log("success insert va to sspd")
        }
    })
}
const doCallbackUpdateVA = async (status_bayar, va, no_rrn) => {
    let query = {
        text:`UPDATE sspd set status_bayar = $1, no_rrn = $2 WHERE virtual_account = $3 AND status_verifikasi = $4 returning virtual_account as va, status_bayar`,
        value:[status_bayar, no_rrn, va, 1]
    }
   res =  await pool.query(query.text,query.value).then(res => {
        return res
   }).catch(e => {
    console.log("ini error", e)
   })

   if(res.rowCount > 0){
    console.log(res.rowCount)
    return res.rows[0]
   }

}

module.exports = {
    doSearchSSPD,
    doInsertVaToSspd,
    doCallbackUpdateVA,
}