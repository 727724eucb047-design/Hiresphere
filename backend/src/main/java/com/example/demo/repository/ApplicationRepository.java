public interface ApplicationRepository extends JpaRepository<Application, Long> {

    List<Application> findByJob_Id(Long jobId);

    List<Application> findByUser_Id(Long userId);

    boolean existsByJob_IdAndUser_Id(Long jobId, Long userId);
}