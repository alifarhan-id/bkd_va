
-- insert va
BEGIN
  IF OLD.status_bayar = '1' THEN
      INSERT INTO pembayaran_pajak(nama_wp,nik,alamat_wp,kelurahan_wp,kota_wp,kode_pos_wp,
        nop, alamat_op, rt_rw_op, kota_op, luas_tanah, luas_bangunan, njop_tanah, njop_bangunan,
        hasil_luas_kali_njop_tanah, hasil_luas_kali_njop_bangunan, njop_pbb, nilai_pasar, jenis_bphtb,
        nomor_sertifikat, npop, npoptkp, npopkp, bphtb_terhutang, jumlah_setoran_berdasarkan, jumlah_setoran, tahun, bulan,
        create_at, update_at, rt_rw_wp, kecamatan_wp, kelurahan_op, pengurangan, 
        no_sspd, no_registrasi, user_name, status, jenis_bayar) VALUES(
        NEW.nama_wp, NEW.nik, NEW.alamat_wp, NEW.kelurahan_wp, NEW.kota_wp, NEW.kode_pos_wp,
        NEW.nop, NEW.alamat_op, NEW.rt_rw_op, NEW.kota_op, NEW.luas_tanah, NEW.luas_bangunan, NEW.njop_tanah, NEW.njop_bangunan,
        NEW.hasil_luas_kali_njop_tanah, NEW.hasil_luas_kali_njop_bangunan, NEW.njop_pbb, NEW.nilai_pasar, NEW.jenis_bphtb,
        NEW.nomor_sertifikat, NEW.npop, NEW.npoptkp, NEW.npopkp, NEW.bphtb_terhutang, NEW.jumlah_setoran_berdasarkan, NEW.jumlah_setoran, NEW.tahun, NEW.bulan,
        current_timestamp , current_timestamp, NEW.rt_rw_wp, NEW.kecamatan_wp, NEW.kelurahan_op, NEW.pengurangan, 
        NEW.no_sspd, NEW.virtual_account, 'VA-Bank-NTB', 'Y', 'L'
       );
  END IF;
  RETURN NEW;

END


-- insert payment to bpn_payment
BEGIN
	IF length(NEW.no_registrasi) > 15 THEN
        INSERT INTO public.pembayaran_basong("NAMA", "NIK", "ALAMAT", "NOP", "KOTA_OP", "LUASTANAH", "LUASBANGUNAN", "PEMBAYARAN", "TANGGAL_PEMBAYARAN",
                                            "KELURAHAN_OP", "NTPD", "STATUS", "JENISBAYAR", "KECAMATAN_OP")VALUES(
                                            NEW.nama_wp, NEW.nik, NEW.alamat_wp, NEW.nop, NEW.kota_op, NEW.luas_tanah, NEW.luas_bangunan,
                                            NEW.jumlah_setoran, to_char(CURRENT_DATE, 'DD/MM/YYYY'), NEW.kelurahan_op, NEW.no_registrasi, NEW.status,
                                            NEW.jenis_bayar, NEW.kota_op);
    END IF;
	RETURN NEW;
END;