package org.spring.backend.drug.document;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.*;

@Document(indexName = "drugs")
@Setting(settingPath = "elasticsearch/settings.json") // 기존 Nori 설정 파일 경로
@Getter @Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DrugDocument {

    @Id
    private String id; // DB의 id 사용

    @Field(type = FieldType.Keyword)
    private String itemSeq;

    @Field(type = FieldType.Text, analyzer = "nori_analyzer", searchAnalyzer = "nori_analyzer")
    private String itemName;

    @Field(type = FieldType.Text, analyzer = "nori_analyzer")
    private String entpName;

    // 효능 정보는 증상 검색(예: "머리 아플 때")의 핵심이므로 Nori 분석기 필수
    @Field(type = FieldType.Text, analyzer = "nori_analyzer")
    private String efficacy;

    @Field(type = FieldType.Text, analyzer = "nori_analyzer")
    private String useMethod;

    @Field(type = FieldType.Text, analyzer = "nori_analyzer")
    private String caution;

    @Field(type = FieldType.Keyword, index = false) // 검색은 안 하지만 결과 노출용
    private String itemImage;
}