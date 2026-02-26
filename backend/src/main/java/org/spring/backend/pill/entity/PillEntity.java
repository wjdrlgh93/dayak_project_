package org.spring.backend.pill.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "pill_tb", indexes = {
        @Index(name = "idx_pill_search", columnList = "printFront, drugShape, colorClass1")
})
public class PillEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String itemSeq;     

    @Column(nullable = false)
    private String itemName;    

    private String entpName;    

    
    @Column(columnDefinition = "TEXT")
    private String chart;       

    private String itemImage;   

    
    private String printFront;  
    private String printBack;   
    private String drugShape;   
    private String colorClass1; 
    private String colorClass2; 
    private String className;   

    @Lob
    @Column(columnDefinition = "LONGTEXT") 
    private String efficacy;
}