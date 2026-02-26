package org.spring.backend.pill.common;

import lombok.Getter;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Getter
public enum PillFilter {
    
    SHAPE_CIRCLE("원형"),
    SHAPE_OVAL("타원형"),
    SHAPE_HALF_CIRCLE("반원형"),
    SHAPE_RECTANGLE("장방형"),
    SHAPE_TRIANGLE("삼각형"),
    SHAPE_SQUARE("사각형"),
    SHAPE_PENTAGON("오각형"),
    SHAPE_HEXAGON("육각형"),
    SHAPE_OCTAGON("팔각형"),
    SHAPE_DIAMOND("마름모형"),

    
    COLOR_WHITE("하양"),
    COLOR_YELLOW("노랑"),
    COLOR_ORANGE("주황"),
    COLOR_PINK("분홍"),
    COLOR_RED("빨강"),
    COLOR_BROWN("갈색"),
    COLOR_LIGHT_GREEN("연두"),
    COLOR_GREEN("초록"),
    COLOR_BLUE("파랑"),
    COLOR_PURPLE("보라"),
    COLOR_BLACK("검정"),
    COLOR_TRANSPARENT("투명");

    private final String koreanName;
    private final String encodedName;

    PillFilter(String koreanName) {
        this.koreanName = koreanName;
        
        this.encodedName = URLEncoder.encode(koreanName, StandardCharsets.UTF_8);
    }

    public static String getEncodedValue(String koreanInput) {
        if (koreanInput == null || koreanInput.isEmpty()) return "";

        for (PillFilter filter : values()) {
            if (filter.koreanName.equals(koreanInput)) {
                return filter.encodedName;
            }
        }
        
        return URLEncoder.encode(koreanInput, StandardCharsets.UTF_8);
    }
}