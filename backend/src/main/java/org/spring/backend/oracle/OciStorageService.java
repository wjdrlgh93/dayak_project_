package org.spring.backend.oracle;

import com.oracle.bmc.ConfigFileReader;
import com.oracle.bmc.Region;
import com.oracle.bmc.auth.SimpleAuthenticationDetailsProvider;
import com.oracle.bmc.objectstorage.ObjectStorage;
import com.oracle.bmc.objectstorage.ObjectStorageClient;
import com.oracle.bmc.objectstorage.requests.PutObjectRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.UUID;
import java.util.function.Supplier;

@Service
public class OciStorageService {

    @Value("${oci.user}") private String userId;
    @Value("${oci.tenancy}") private String tenancyId;
    @Value("${oci.fingerprint}") private String fingerprint;
    @Value("${oci.region}") private String region;
    @Value("${oci.namespace}") private String namespace;
    @Value("${oci.bucketName}") private String bucketName;
    @Value("${oci.privateKey}") private String privateKey;

    public String uploadImage(MultipartFile file) throws Exception {
        
        
        String formattedKey = privateKey.replace("\\n", "\n");

        
        Supplier<InputStream> privateKeySupplier = () ->
                new ByteArrayInputStream(formattedKey.getBytes(StandardCharsets.UTF_8));

        SimpleAuthenticationDetailsProvider provider = SimpleAuthenticationDetailsProvider.builder()
                .userId(userId)
                .tenantId(tenancyId)
                .fingerprint(fingerprint)
                .region(Region.fromRegionId(region))
                .privateKeySupplier(privateKeySupplier)
                .build();

        
        try (ObjectStorage client = ObjectStorageClient.builder().build(provider)) {

            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();

            
            PutObjectRequest request = PutObjectRequest.builder()
                    .namespaceName(namespace)
                    .bucketName(bucketName)
                    .objectName(fileName)
                    .contentType(file.getContentType())
                    .putObjectBody(file.getInputStream())
                    .build();

            
            client.putObject(request);

            
            return String.format("https://objectstorage.%s.oraclecloud.com/n/%s/b/%s/o/%s",
                    region, namespace, bucketName, fileName);
        } catch (Exception e) {
            
            System.err.println("OCI Upload Error: " + e.getMessage());
            throw e;
        }
    }
}