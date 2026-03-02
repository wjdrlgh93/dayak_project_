package org.spring.backend.pharmacy.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.spring.backend.pharmacy.dto.KakaoPharmacyDto;
import org.spring.backend.pharmacy.dto.PharmacyDto;
import org.spring.backend.pharmacy.entity.PharmacyEntity;
import org.spring.backend.pharmacy.repository.PhamacyRepository;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.util.UriComponentsBuilder;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ParmacyService {

    private final PhamacyRepository pharmacyRepository;

    /**
     * 공공데이터 API(getParmacyFullDown)를 호출하여
     * 전체 약국 데이터를 200개씩 배치로 DB에 동기화합니다.
     */
    @Async     public void syncAllPharmacies() {
        int pageNo = 1;
        int numOfRows = 200;
        boolean hasMoreData = true;

        log.info("=== 약국 데이터 비동기 동기화 시작 ===");

        while (hasMoreData) {
            String url = UriComponentsBuilder.fromHttpUrl("http://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/getParmacyFullDown")
                    .queryParam("serviceKey", "97ec384396b270b2574f58319355dead3782970806d340e52f127f51a80f7e48")
                    .queryParam("pageNo", pageNo)
                    .queryParam("numOfRows", numOfRows)
                    .build(true).toUriString();

            Document doc = parseXml(url);
            NodeList nList = (doc != null) ? doc.getElementsByTagName("item") : null;

            if (nList == null || nList.getLength() == 0) {
                log.info("동기화 완료. 총 {}페이지까지 저장됨.", pageNo - 1);
                hasMoreData = false;
                break;
            }

                        processPage(nList);

            log.info("페이지 {} 완료 (현재까지 {}개 처리 중...)", pageNo, pageNo * numOfRows);
            pageNo++;
        }
    }

        @Transactional
    public void processPage(NodeList nList) {
        List<PharmacyEntity> batchList = new ArrayList<>();

        for (int i = 0; i < nList.getLength(); i++) {
            Element e = (Element) nList.item(i);
            String hpid = getTagValue("hpid", e);
            if (hpid.isEmpty()) continue;

                                    PharmacyEntity pharmacy = pharmacyRepository.findByHpid(hpid)
                    .orElse(new PharmacyEntity());

            pharmacy.setHpid(hpid);
            pharmacy.setDutyName(getTagValue("dutyName", e));
            pharmacy.setDutyTel1(getTagValue("dutyTel1", e));
            pharmacy.setDutyAddr(getTagValue("dutyAddr", e));
            pharmacy.setWgs84Lon(getTagValue("wgs84Lon", e));
            pharmacy.setWgs84Lat(getTagValue("wgs84Lat", e));

            String startTime = getTagValue("dutyTime1s", e);
            String endTime = getTagValue("dutyTime1c", e);
            pharmacy.setQt(startTime.isEmpty() ? "정보없음" : startTime + " ~ " + endTime);

            batchList.add(pharmacy);
        }
        pharmacyRepository.saveAll(batchList);     }


    /**
     *
     * URL로부터 XML을 읽어와 Document 객체로 반환하는 안전한 파싱 메서드
     */
    private Document parseXml(String urlString) {
        try {
            DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();

            URL url = new URL(urlString);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setConnectTimeout(10000);             conn.setReadTimeout(10000);

                        if (conn.getResponseCode() != 200) {
                log.error("API 서버 응답 에러: HTTP {}", conn.getResponseCode());
                return null;
            }

            InputStream is = conn.getInputStream();
            Document doc = dBuilder.parse(is);
            doc.getDocumentElement().normalize();
            return doc;

        } catch (Exception e) {
            log.error("XML 파싱 예외 발생: {}", e.getMessage());
            return null;
        }
    }

    /**
     * XML 엘리먼트에서 특정 태그의 텍스트 값을 안전하게 추출 (NPE 방지)
     */
    private String getTagValue(String tag, Element eElement) {
        if (eElement == null) return "";
        NodeList nList = eElement.getElementsByTagName(tag);

                if (nList == null || nList.getLength() == 0 || nList.item(0) == null) {
            return "";
        }

        Node nValue = nList.item(0);
        if (!nValue.hasChildNodes() || nValue.getFirstChild() == null) {
            return "";
        }

        return nValue.getFirstChild().getNodeValue().trim();
    }

        public void saveKakaoPharmacies(List<KakaoPharmacyDto> kakaoList) {
        for (KakaoPharmacyDto dto : kakaoList) {
                        String uniqueId = "K-" + dto.getId();

                        if (pharmacyRepository.existsByHpid(uniqueId)) {
                continue;
            }

                        PharmacyEntity entity = PharmacyEntity.builder()
                    .hpid(uniqueId)                                     .dutyName(dto.getPlace_name())                      .dutyAddr(dto.getAddress_name())                    .dutyTel1(dto.getPhone())                           .wgs84Lon(dto.getX())                               .wgs84Lat(dto.getY())                               .qt("영업시간 정보 없음")                             .build();

                        pharmacyRepository.save(entity);
        }
    }

    public List<PharmacyDto> findByRegion(String city, String district) {
        String address = city + " " + district;

                List<PharmacyEntity> entities = pharmacyRepository.findByDutyAddrStartingWith(address);

                return entities.stream()
                .map(entity -> new PharmacyDto(entity))                 .collect(Collectors.toList());
    }




}