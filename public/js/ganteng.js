$(document).ready(function(){
    $(".result-va").hide()
    $(".request-va").on('click', function(){
        sspd = $('#input-va').val()
        $.ajax({
            url:"/payment/va/search_sspd",
            method:"POST",
            data:{sspd:sspd},
        }).done(function(res){
            if(res.success === true){
                    let content = `
                    <table class="table table-bordered ">
                    <thead>
                    </thead>
                    <tbody class="text-dark">
                      <tr>
                        <th>NIK</th>
                        <td>${res.data.nik}</td>
                      </tr>
                      <tr>
                        <th>Nama WP</th>
                        <td>${res.data.nama_wp}</td>
                      </tr>
                      <tr>
                        <th>Alamat WP</th>
                        <td>${res.data.alamat_wp}</td>
                      </tr>
                      <tr>
                        <th>Nomor sspd</th>
                        <td>${res.data.no_sspd}</td>
                      </tr>
                      <tr>
                        <th>NOP</th>
                        <td>${res.data.nop}</td>
                      </tr>
                      <tr>
                        <th>Luas Tanah</th>
                        <td>${res.data.luas_tanah}</td>
                      </tr>
                      <tr>
                        <th>Luas Bangunan</th>
                        <td>${res.data.luas_bangunan}</td>
                      </tr>
                      <tr>
                        <th>Nomor Sertifikat</th>
                        <td>${res.data.nomor_sertifikat}</td>
                      </tr>
                      <tr>
                        <th>Total BPHTB</th>
                        <td><h4 class="text-danger font-weight-bold">${res.data.jumlah_setoran}</h4></td>
                      </tr>

                    </tbody>
                  </table>
                    `
                        Swal.fire({
                            title: `Check Data`,
                            html:content,
                            icon: 'success',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Request VA'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                $('#searchModal').modal('toggle')
                               requestVA(res.data)
                                
                            }
                        })

            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Data Tidak Ditemukan',
                    text: 'Pastikan anda memasukan nomor SSPD dengan benar',
                  })
            }
        }).fail(function(e){
            Swal.fire({
                icon: 'error',
                title: 'Something error',
              })
        })
    })


    function requestVA(data){
        $(".result-va").show()
        let datetime_expired_va = moment().add(3, 'days').format('YYYY-MM-DD') 
        console.log(data)
        jsonData = {
            va:data.no_sspd,
            id_mitra:"006",
            id_produk:"01",
            name:data.nama_wp,
            billing_type:"0",
            email:"-",
            phone:"-",
            datetime_expired: datetime_expired_va,
            description: `Pembayaran BPHTB atas nama wajib pajak ${data.nama_wp}`,
            tagihan: data.jumlah_setoran
        }
        $.ajax({
            url:"/payment/va/getva",
            method:"POST",
            data:jsonData,
            dataType:'json'

        }).done(function(res){
            if(res.rCode === "000"){
              $('#vaResult').html(res.data.va)
            }
        }).fail(function(e){
          Swal.fire({
            icon: 'error',
            title: 'another error',
            text: 'cannot get response from bank',
          })
            
        })

    }


});