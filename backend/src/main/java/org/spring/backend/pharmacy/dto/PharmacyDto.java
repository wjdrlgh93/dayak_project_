package org.spring.backend.pharmacy.dto;


import lombok.*;
import org.spring.backend.pharmacy.entity.PharmacyEntity;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PharmacyDto {
    private String id;               
    private String place_name;       
    private String phone;            
    private String address_name;     
    private String x;                
    private String y;                
    private String qt;               
    private String place_url;

    
    public PharmacyDto(PharmacyEntity entity) {
        this.id = entity.getHpid();
        this.place_name = entity.getDutyName();
        this.phone = entity.getDutyTel1();
        this.address_name = entity.getDutyAddr();

        
        
        this.x = entity.getWgs84Lon() != null ? String.valueOf(entity.getWgs84Lon()) : "";
        this.y = entity.getWgs84Lat() != null ? String.valueOf(entity.getWgs84Lat()) : "";

        this.qt = entity.getQt();
        this.place_url = "";
    }
}