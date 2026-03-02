package org.spring.backend.pharmacy.repository;



import org.spring.backend.pharmacy.dto.PharmacyDto;
import org.spring.backend.pharmacy.entity.PharmacyEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PhamacyRepository extends JpaRepository<PharmacyEntity, Long> {

        Optional<PharmacyEntity> findByHpid(String hpid);

        List<PharmacyEntity> findByDutyNameContaining(String name);

            @Query(value = "SELECT *, " +
                        "(6371 * acos(cos(radians(:lat)) * cos(radians(wgs84lat)) * cos(radians(wgs84lon) - radians(:lon)) + " +
            "sin(radians(:lat)) * sin(radians(wgs84lat)))) AS distance " +
            "FROM pharmacy_tb " +
            "HAVING distance <= 2 " +
            "ORDER BY distance",
            countQuery = "SELECT count(*) FROM pharmacy_tb",
            nativeQuery = true)
    Page<PharmacyEntity> findNearbyPharmacies(@Param("lat") Double lat,
                                              @Param("lon") Double lon,
                                              Pageable pageable);

            List<PharmacyEntity> findByDutyAddrStartingWith(String dutyAddr);

    boolean existsByHpid(String uniqueId);
}