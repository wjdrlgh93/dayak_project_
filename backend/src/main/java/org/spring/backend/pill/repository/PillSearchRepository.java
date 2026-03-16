package org.spring.backend.pill.repository;

import org.spring.backend.pill.document.PillDocument;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PillSearchRepository extends ElasticsearchRepository<PillDocument, String> {



    Page<PillDocument> findByItemName(String itemName, Pageable pageable);

    Page<PillDocument> findByEfficacyContaining(String keyword, Pageable pageable);

    Page<PillDocument> findByEntpName(String entpName, Pageable pageable);
}
