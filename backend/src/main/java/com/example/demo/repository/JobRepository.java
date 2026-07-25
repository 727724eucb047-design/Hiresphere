@Repository
public interface JobRepository extends JpaRepository<Job, Long> {

    List<Job> findByLocation(String location);

    List<Job> findByCompany(String company);

    @Query("SELECT j FROM Job j WHERE LOWER(j.company) = LOWER(?1)")
    List<Job> findJobsByCompany(String company);
}