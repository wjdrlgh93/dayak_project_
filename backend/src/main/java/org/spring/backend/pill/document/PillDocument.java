package org.spring.backend.pill.document;

import jakarta.persistence.Id;
import lombok.*;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
import org.springframework.data.elasticsearch.annotations.Setting;

@Document(indexName = "pills")
@Setting(settingPath = "elasticsearch/settings.json") // 한글 분석기 설정을 위해 필요 (나중에 추가)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PillDocument {

    @Id
    private String id;

    @Field(type = FieldType.Text, analyzer = "nori_analyzer")
    private String itemName;

    @Field(type = FieldType.Keyword)
    private String entpName;

    @Field(type = FieldType.Text)
    private String efficacy;

    @Field(type = FieldType.Keyword)
    private String printFront;

    @Field(type = FieldType.Keyword)
    private String drugShape;

    @Field(type = FieldType.Keyword)
    private String colorClass1;
}