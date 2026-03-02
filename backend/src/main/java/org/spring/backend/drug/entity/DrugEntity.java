package org.spring.backend.drug.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "drug_tb") @Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DrugEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; 
    @Column(unique = true, nullable = false)
    private String itemSeq;     
    @Column(nullable = false)
    private String itemName;    
    private String entpName;    
        @Column(columnDefinition = "TEXT")
    private String efficacy;    
    @Column(columnDefinition = "TEXT")
    private String useMethod;   
    @Column(columnDefinition = "TEXT")
    private String caution;     
    private String itemImage;   }