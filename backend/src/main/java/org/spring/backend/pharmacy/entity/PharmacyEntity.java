package org.spring.backend.pharmacy.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter 
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "pharmacy_tb")
public class PharmacyEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String hpid;      

    @Column(nullable = false)
    private String dutyName;  

    private String dutyTel1;  

    @Column(length = 500)
    private String dutyAddr;  

    @Column(name = "wgs84lon")
    private String wgs84Lon;  
    @Column(name = "wgs84lat")
    private String wgs84Lat;  

    @Column(length = 1000)
    private String qt;        

    
    public void updateInfo(String name, String tel, String addr, String lon, String lat, String qtInfo) {
        this.dutyName = name;
        this.dutyTel1 = tel;
        this.dutyAddr = addr;
        this.wgs84Lon = lon;
        this.wgs84Lat = lat;
        this.qt = qtInfo;
    }
}