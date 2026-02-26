package org.spring.backend.medication.entity;

import jakarta.persistence.*;
import lombok.*;
import org.spring.backend.global.BasicTime;
import org.spring.backend.member.entity.MemberEntity;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "guardian_tb")
public class GuardianEntity extends BasicTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "guardian_conn_id")
    private Long id;

    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ward_id") 
    private MemberEntity ward;

    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "guardian_id")
    private MemberEntity guardian;

    
    private String relationship;

    
    @Builder.Default
    private boolean isApproved = false;
}