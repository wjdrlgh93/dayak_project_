package org.spring.backend.drug.repository;

import org.spring.backend.drug.document.DrugDocument;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface DrugSearchRepository extends ElasticsearchRepository<DrugDocument, String> {
    Page<DrugDocument> findByItemNameOrEfficacyOrEntpName(
            String itemName, String efficacy, String entpName, Pageable pageable
    );

}
